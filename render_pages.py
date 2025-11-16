# Inspired by Carl Ost Wilkens https://ostwilkens.se/blog/setting-up-blog

import os

def main():
    # Define the directory containing the Markdown files
    pages_dir = './raw_pages'
    output_dir = './'

    # Read template.html
    with open("template.html", 'r', encoding='utf-8') as file:
        template = file.read()

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Iterate over all dirs in the posts directory
    for page in os.listdir(pages_dir):
        # Construct full file path
        file_path = os.path.join(pages_dir, page)

        # Read the Markdown file
        with open(file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()

        # Interpolate
        html_content = template.replace('{{ content }}', html_content)

        # Construct HTML file path
        html_path = os.path.join(output_dir, page)

        # Save the HTML file
        with open(html_path, 'w', encoding='utf-8') as file:
            file.write('<!-- DO NOT EDIT! Edit the raw_pages file instead -->')
            file.write(html_content)
        print(f"Rendered {page}")

main()