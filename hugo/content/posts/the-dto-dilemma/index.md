---
title: "The DTO dilemma"
tags: ["architecture", "open-article"]
date: "2016-07-24"
aliases:
  - "/post/8"
  - "/post/08"
---


When implementing the **hexagonal architecture** in my TicTacToe Project, and then in the [Blog engine](https://github.com/ShockN745/WebAppSpring) that _used to_ power this blog I was confronted with a problem. **The DTO dilemma**.<!--more-->

**DTOs** seem to be the perfect candidates to improve **modularity** and **abstract communication** between different part of the application, but are they really doing **more good than harm**?

After implementing two project using strictly DTOs, I am not sure anymore the idealistic abstraction of boundaries is **worth the trouble**. What's your take on that?

##Clean boundaries
The main aspect of the Hexagonal architecture is: **separation of concerns**. To that extend the Domain is **free** of any dependencies.

*To have a better overview of the Hexagonal Architecture, check out my series on the topic: [Hexagonal Architecture](/hexagonal-android-pt1-intro*)

But being free of dependencies is not the only characteristics of the Domain. Indeed there need to be **clear boundaries** between the Domain and the other Modules of the application: Presentation, Persistence, Network, . . .

Indeed, if all the Domain objects were **accessible** from the different modules. Their use would be **scattered** all around the application, and we would **lose** some of the **modularity** and **decoupling** we cherish.

The solution for that is to **abstract the boundary** between the domain and the other modules. From the point of view of the modules; What we really want: is to **ask** the domain to do something, realize a service. What we do not want: is to **know** how that's done.

##Matryoshka, or the Micro Network

The easiest way to picture this abstraction, in my opinion, is to imagine the **Domain as a remote server**, and all the Modules as clients of this server. They can interact. In both directions, but their interaction is **normalized**.

The most decoupled way to communicate with a server is through a **REST** interface. Now we are not going to serialize our domain objects to JSON just for the fun of it. But what if there was a way to share data between different part of the application in a completely decoupled way, without the use of **serialization**?

There comes the ~~king~~ **DTO**.


### The Data Transfer Object

The **Data Transfer Object** is an object whose sole purpose is to hold other values. **No logic**, nothing, simply values. Since there is no logic at all, using public fields should perfectly fine.

######A typical DTO would look like this

~~~ java
public class PersonDto {
    public final String firstName;
    public final String lastName;
    public final int age;

    public PersonDto(String firstName, String lastName, int age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}
~~~

Following our previous analogy, the DTO is the equivalent of a JSON object. It is a **code representation of a serialized state** that can be passed around without any worries. Why that? Because even thought the DTO is used to share state. It itself is completely **stateless**. It is a snapshot of an object at a given time.

###Mapping, mapping, mapping
In this heaven of boundaries abstraction, the Domain **shares** data with the different modules using exclusively DTOs.

But the domain **does not manipulate** DTOs. As their name imply they are exclusively used to **transfer** data. Domain objects **need** to have behavior, DTOs **intentionally don't**.

Therefore every time a DTO is shared, a corresponding object, with **behavior**, must be created in the Domain. This is commonly done with the use of **Mappers**. Their purpose is to map the data contained in a **DTO** to a **Domain object**, wiring at the same time all the needed **dependencies**.

Then the domain objects are used in the Domain just as before the introduction of DTOs. And when a result is ready to be made available to the module that requested it, the **Mapper** will immortalize a snapshot of the Domain object to a DTO to share it across the boundary.

###Example: Translation of an Article
To make things clearer here is an **example**: The translation to a different language of a text Article.

The service offered by the Domain to another module, say the Presentation module, for instance, is to **translate** the content of an article.

####Building Blocks
######The Article and its corresponding DTO

~~~ java
public class ArticleDto {
    public final LocalDate date;
    public final String text;

    public ArticleDto(LocalDate date, String text) {
        this.date = date;
        this.text = text;
    }
}

public class Article {
    private final Translator translator;
    private LocalDate date;
    private String text;

    public Article(Translator translator, LocalDate date, String text) {
        this.translator = translator;
        this.date = checkNotNull(date);
        this.text = nullToEmpty(text);
    }

    public void translate(Language language) {
        text = translator.translate(text, language);
    }

    public String getText() {
        return text;
    }

    public LocalDate getDate() {
        return date;
    }
}
~~~

######Some Translator
~~~ java
public enum Language {
    ENGLISH,
    FRENCH,
    ...
}

public class Translator {
    public String translate(String toTranslate, Language language) {
        ////////////////////
        // do translation //
        ////////////////////

        return translated;
    }
}
~~~

As we can see from the building blocks, the article possesses a method that translates its content to a given language. This is done through the use of a **Translator**. Nothing interesting so far.

####The Use Case
The **way** this service is offered to external modules is, however, interesting. The Presentation module would access this service through a dedicated **UseCase** class whose standardized way to communicate is through the use of **DTO**.

Then the DTO would be **mapped** to a domain object. From this point, we enter the **Domain realm** and things go as initially planned.

Finally, when a result is available, it is **mapped** again to a DTO and sent to the presentation layer.

######The UseCase
~~~ java
public class TranslateArticleUseCase {

    private final ArticleMapper mapper;

    public TranslateArticleUseCase(ArticleMapper mapper) {
        this.mapper = mapper;
    }

    public ArticleDto translate(ArticleDto articleDto, Language language) {
        Article article = mapper.transform(articleDto);

        // Domain //
        article.translate(language);
        // End of Domain //

        ArticleDto resultDto = mapper.transform(article);
        return resultDto;
    }
}
~~~

######The Mapper
~~~ java
public class ArticleMapper {

    private final Translator translator;

    public ArticleMapper(Translator translator) {
        this.translator = translator;
    }

    public ArticleDto transform(Article article) {
        return new ArticleDto(article.getDate(), article.getText());
    }

    public Article transform(ArticleDto articleDto) {
        return new Article(translator, , articleDto.text, );
    }
}
~~~

###Conclusion

After this introduction on the use of DTO at the Domain boundary, we can see that there is nothing difficult to understand.

It simply consists of a set of **conventions** that, when followed, offer a **looser coupling** between the domain and the modules of the application.

Using DTO is definitely effective to reduce coupling in the application, but, as always, it is not a Silver Buller. 

##Mapping, mapping, mapping. Take two!
To summarize in one sentence: Using DTOs at the boundary of the Domain is the POJO equivalent of serializing the data before transmitting it to the modules.

This serialization - deserialization is done with the help of **Mappers**. They map DTOs to Domain Objects.

The whole **goal** of trying as hard as possible to **reduce coupling** is to **improve maintainability**. With less coupling it is easier to make module evolve **independently** of each other.

But are DTOs really helping maintainability? 

Taking a look back at the **Mappers**, they don't only convert DTOs to Domain Objects. They also convert DTOs to Presentation Objects, DTOs to Persistence Objects, DTOs to NetworkObjects, . . . That is **a lot** of mapping.

###Is decoupling an illusion?
With all this mapping are the modules and the Domain really more decoupled than they would be without the use of DTOs? 

Sure if the 'Article' Domain object decided to change his **behavior** this wouldn't **affect** at all any of the other modules. But, if OOP is done right, even **without** the uses of DTOs it shouldn't either.

But now, consider a field must be **added** to the 'Article' Domain object. Again, sure, no problem: The Domain object **can** be modified without changing anything on the modules communication with DTOs. But the field that has just been added, it most likely has a **purpose**. Usually, it is added in the Domain object because one of the **modules** needs to **access** it one way or the other. 

So, if a field is **added** to a Domain Object. Even if from a strictly technical point of view, yes the domain Object is completely decoupled from everything else with the DTO barrier. In a **real world** environment the field would **inevitably** need to be added to the corresponding DTO.

And, when a field is added to a DTO. . . Then begins the fun.

Remember how many times our DTO is **mapped** to different objects? Short answer: too much. If a field is **added** to a DTO, it will be **added** to the corresponding object in the consumer module that requested this information. And for consistency, most likely in the corresponding objects of all the **other modules** as well.

In short, every time a field will be **added** to a Domain Object. It will be **added** to a **plethora** of other objects completely annihilating the **illusion of decoupling** we had when introducing DTOs.

And that is: **The DTO dilemma**



##The DTO dilemma

The **DTO dilemma** follows the **DTO paradox**. The DTO paradox goes like this:
######Both these sentences are true: 

 - Using DTOs **reduces** coupling therefore **increase** maintainability
 - Using DTOs **increases** duplication therefore **reduces** maintainability

The DTO dilemma is simple: What should I do? 
 
The problem is that: On a **small** project with a single developer, **both approaches** with/without DTOs are **viable** and produce **maintainable** code. 

Conceptually I really **like** the DTO approach, therefore it is the one I use in most my projects. It makes a lot of sense and is (for me) easier to follow. But I have come to **fear** changing the structure of my Domain objects. Which is the complete opposite of what I am trying to achieve: **Evolutive code**.
 
I really have no idea whether using DTOs or not is a **good practice**. I am not even sure that I understood the concept **fully**. But what I am sure of is that I really need an **input** from a good samaritan with a lot of **experience** on the topic.  

Are you using the DTO approach in the **past**? **Currently**? How did that **work** for you? Did I **miss** anything or the **dilemma** is indeed there? 

If the dilemma is **real**. What are the **solutions** that are standard in the industry to counter this problem? I think **AOP** would be a good candidate, but since my knowledge of Aspect Oriented Programming is superficial I am really not sure.

That concludes a long headache session. If you've read this far: **Thank you** for your dedication ^_^ I am really looking forward to hearing any kind of input on this topic.


*I think there is no need to mention it, especially in this article. But any comments would be very welcome. As always, thanks for your support*

*--- The Professional Beginner*

