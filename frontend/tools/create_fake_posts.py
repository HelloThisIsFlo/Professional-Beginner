# import lorem
from lorem.text import TextLorem
import random
from textwrap import dedent
import os 
import shutil

lorem = TextLorem(srange=(3, 5), prange=(8, 20), trange=(5, 10))


def fake_post():
    title = lorem.sentence()
    tags = ['debug']
    day = random.randint(1, 30)
    excerpt = lorem.sentence() + lorem.sentence() + lorem.sentence()
    text = lorem.text()
    slug = title.replace(' ', '-').lower()

    content = dedent("""\
        ---
        title: {title}
        date: "2019-05-{day}"
        tags: ['debug']
        ---

        # {title}
        
        {excerpt}
        <!--end-->
        {text}
        """).format(title=title, excerpt=excerpt, day=day, text=text)

    return {'content': content,
            'title': title,
            'slug': slug}



for _ in range(0, 5):
    post = fake_post()
    post_dir = './fake_posts/' + post['slug']
    os.makedirs(post_dir)
    with open(post_dir + '/index.md', 'w') as post_md_file:
        post_md_file.write(post['content'])
    shutil.copyfile('./placeholder.png', post_dir + '/hero.png')