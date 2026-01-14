# Inspired by Carl Ost Wilkens https://ostwilkens.se/blog/setting-up-blog

import os
import markdown2
from markdown_it import MarkdownIt

def main():
    md = MarkdownIt()

    # Define the directory containing the Markdown files
    pages_dir = './raw_pages'
    posts_dir = './raw_blog_posts'
    output_dir = './'
    posts_output_dir = './blog_posts'
    blog_home_path = './blog.html'

    # Read template.html
    with open("template.html", 'r', encoding='utf-8') as file:
        template = file.read()

    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    # Iterate over all dirs in the pages directory
    for page in os.listdir(pages_dir):
        # Construct full file path
        file_path = os.path.join(pages_dir, page)

        with open(file_path, 'r', encoding='utf-8') as file:
            html_content = file.read()

        # Interpolate
        html_content = template.replace('{{ content }}', html_content)

        # Construct HTML file path
        # Future proofed for putting pages in new dir
        if page not in ['index.html', 'about.html', 'blog.html']:
            html_path = os.path.join(output_dir, page)
        else:
            html_path = os.path.join('./', page)

        # Save the HTML file
        with open(html_path, 'w', encoding='utf-8') as file:
            file.write('<!-- DO NOT EDIT! Edit the raw_pages file instead -->')
            file.write(html_content)
        print(f"Rendered {page}")


    all_posts = []
    # Iterate over all dirs in the posts directory
    for file_name_md in sorted(os.listdir(posts_dir)):
        # Construct full file path
        file_path = os.path.join(posts_dir, file_name_md)

        # Read the Markdown file
        with open(file_path, 'r', encoding='utf-8') as file:
            md_content = file.read()

        title = md_content.split("# ", 1).pop(1).split("\n").pop(0)
        date = md_content.split("## ", 1).pop(1).split("\n").pop(0)

        # Convert Markdown to HTML
        html_content = md.render(md_content)
        html_content = '<div class="container marketing"><br></br><div class="col-md-12 col-md-offset-0">' + html_content + '</div><br></br></div>'
        html_content = template.replace('{{ content }}', html_content)
        html_content = html_content.replace('href="./', 'href="../')

        # Construct HTML file path
        html_filename = file_name_md.replace('.md', '.html')  # Replace .md with .html
        html_path = os.path.join(posts_output_dir, html_filename)

        all_posts.append((title, date, html_path))

        # Save the HTML file
        with open(html_path, 'w', encoding='utf-8') as file:
            file.write(html_content)
        print(f"Rendered {file_name_md} to {html_filename}")

    # Make blog posts page
    with open(blog_home_path, 'r', encoding='utf-8') as file:
        blog_page = file.read()

    print(all_posts)
    html_posts_list = ''
    for (title, date, html_path) in all_posts:
        print(title)
        html_posts_list = f'<a href="./{html_path}"><div class="col-md-12 col-md-offset-0"><h2>{title}</h2><h4>{date}</h4></div></a>\n' + html_posts_list

    blog_page = blog_page.replace('{{ blog_posts }}', html_posts_list)

    with open(blog_home_path, 'w', encoding='utf-8') as file:
            file.write(blog_page)
main()