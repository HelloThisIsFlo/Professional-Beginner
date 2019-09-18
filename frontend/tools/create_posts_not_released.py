# import lorem
from lorem.text import TextLorem
import random
from textwrap import dedent
import os

lorem = TextLorem(srange=(3, 5), prange=(8, 20), trange=(5, 10))


def fake_post(index):
    title = f'Not released yet - {str(index)}'
    tags = ['debug']
    day = index
    text = lorem.text()
    slug = title.replace(' ', '-').lower()

    content = dedent("""\
        ---
        title: {title}
        date: "2019-09-{day}"
        tags: ['debug']
        ---

        # {title}
        
        {text}
        """).format(title=title, day=day, text=text)

    return {'content': content,
            'title': title,
            'slug': slug}


for i in range(0, 10):
    post = fake_post(i)
    post_dir = './fake_posts/' + post['slug']
    os.makedirs(post_dir)
    with open(post_dir + '/index.md', 'w') as post_md_file:
        post_md_file.write(post['content'])
