import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, Upload, AlertTriangle, X, FileText, File as FileIcon } from 'lucide-react';
import Button from '../ui/Button';
import { ACCEPTED_FILE_TYPES } from '../../utils/constants';
import { formatFileSize } from '../../utils/helpers';
import { documentApi } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { Document } from '../../utils/types';

interface DocumentUploadProps {
  onDocumentUploaded?: (document: Document) => void;
  maxFiles?: number;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  onDocumentUploaded,
  maxFiles = 5
}) => {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, [files, maxFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: 10485760, // 10MB
    disabled: isUploading || files.length >= maxFiles,
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    
    // Clear any errors for this file
    const updatedErrors = { ...uploadErrors };
    delete updatedErrors[files[index].name];
    setUploadErrors(updatedErrors);
  };

  const uploadFiles = async () => {
    if (!user || files.length === 0) return;
    
    setIsUploading(true);
    
    for (const file of files) {
      try {
        // Initialize progress
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        // Simulate progress updates (in a real app, this would come from the upload API)
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const currentProgress = prev[file.name] || 0;
            const newProgress = Math.min(currentProgress + 10, 90); // Cap at 90% until complete
            return { ...prev, [file.name]: newProgress };
          });
        }, 300);
        
        // Upload the file
        const uploadedDoc = await documentApi.uploadDocument(file, user.id);
        
        // Complete progress
        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        
        // Notify parent component
        if (onDocumentUploaded) {
          onDocumentUploaded(uploadedDoc);
        }
        
        // Remove file from list after successful upload
        setTimeout(() => {
          setFiles(prevFiles => prevFiles.filter(f => f.name !== file.name));
          setUploadProgress(prev => {
            const updated = { ...prev };
            delete updated[file.name];
            return updated;
          });
        }, 1000);
        
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadErrors(prev => ({ 
          ...prev, 
          [file.name]: error instanceof Error ? error.message : 'Upload failed'
        }));
        
        // Set progress to 0 for failed upload
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      }
    }
    
    setIsUploading(false);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText size={24} className="text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText size={24} className="text-blue-500" />;
      case 'txt':
        return <FileText size={24} className="text-neutral-500" />;
      default:
        return <FileIcon size={24} className="text-neutral-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragActive
            ? 'border-primary-400 bg-primary-50'
            : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50'
        } ${isUploading || files.length >= maxFiles ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload 
            size={36} 
            className={isDragActive ? 'text-primary-500' : 'text-neutral-400'} 
          />
          <p className="text-lg font-medium text-neutral-700">
            {isDragActive
              ? 'Drop your documents here'
              : 'Drag & drop your documents here'}
          </p>
          <p className="text-sm text-neutral-500">
            {files.length >= maxFiles 
              ? `Maximum number of files (${maxFiles}) reached`
              : `PDF, DOCX, TXT (Max ${maxFiles} files, 10MB each)`}
          </p>
          {!isDragActive && files.length < maxFiles && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              leftIcon={<File size={16} />}
            >
              Select Files
            </Button>
          )}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4">
          <div className="space-y-3">
            {files.map((file, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg border ${
                  uploadErrors[file.name] ? 'border-error-300' : 'border-neutral-200'
                } p-3 flex items-center`}
              >
                <div className="mr-3">
                  {getFileIcon(file.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-neutral-500 ml-2 flex-shrink-0">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  
                  {uploadErrors[file.name] ? (
                    <div className="mt-1 flex items-center text-xs text-error-600">
                      <AlertTriangle size={12} className="mr-1" />
                      {uploadErrors[file.name]}
                    </div>
                  ) : uploadProgress[file.name] !== undefined ? (
                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-500 rounded-full" 
                          style={{ width: `${uploadProgress[file.name]}%` }}
                        />
                      </div>
                      <span className="text-xs text-neutral-500 mt-1">
                        {uploadProgress[file.name] < 100 
                          ? `Uploading: ${uploadProgress[file.name]}%` 
                          : 'Upload complete'}
                      </span>
                    </div>
                  ) : null}
                </div>
                
                {/* Remove button */}
                {!isUploading && (
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-2 p-1 text-neutral-400 hover:text-error-500 rounded-full hover:bg-neutral-100"
                  >
                    <X size={16} />
                    <span className="sr-only">Remove file</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              onClick={uploadFiles}
              isLoading={isUploading}
              disabled={files.length === 0 || isUploading}
              leftIcon={<Upload size={16} />}
            >
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;