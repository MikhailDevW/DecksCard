import sqlite3


def main():
    con = sqlite3.connect('./backend/decksapi/db.sqlite3')
    cur = con.cursor()

    # данные для тегов
    tags = [
        ('New',), ('Tech',), ('OS',), ('Mobile',),
        ('Audio',), ('Video',), ('Games',), ('IoT',),
        ('DIY',), ('Code',), ('Firmware',), ('Hardware',),
        ('FinTech',),
    ]
    cur.executemany(
        "INSERT INTO news_tag (name)"
        "VALUES (?)", tags
    )
    con.commit()

    # данные для нвостей
    news = [
        ('First news', 'Id like to present our first news'),
        ('New IPhone on stage', 'New IPhone is about to '),
        ('Windows is over!', 'People are cheering - Windows wont be released anymore'),
        ('The big Moon', 'I dont know what to write here...'),
    ]
    cur.executemany(
        "INSERT INTO news_news (title, text)"
        "VALUES (?, ?)", news
    )
    con.commit()

    # # данные для редакторов
    # editor = [
    #     ('Livesey',), ('Mikhail',), ('Julia',), ('Danila',),
    #     ('Dasha',), ('Eugene',),
    # ]
    # cur.executemany(
    #     "INSERT INTO news_editor (name)"
    #     "VALUES (?)", editor
    # )
    # con.commit()


if __name__ == '__main__':
    main()
