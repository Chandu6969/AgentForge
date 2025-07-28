def build_prompt(query, docs, role, tone):
    context = "\n".join([doc.page_content for doc in docs])
    return f"You are a {role} with a {tone} tone. Use the following context:\n{context}\nUser: {query}"
