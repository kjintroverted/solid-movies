# Solid Movies

This is a simple, movie-rating web app based on my personal ten-point rating system for movies. This system attempts to get to the core of what value a movie has in what ways by breaking down how effective its storytelling is.

## Formula

The overall rating is decided by averaging the raw Story rating with the calculated Humanities and Atmosphere ratings. Where Humanities is the average of Character and Performance scores and the Atmosphere is the average of the Visuals and Soundtrack scores:

`avg(STORY, avg(CHARACTER, PERFORMANCE), avg(VISUALS, SOUNDTRACK))`

## Overall Score Meaning

1. I just, I don't know...
1. Trash
1. Waste of Time
1. Can not recommend
1. The Status Quo
1. A Good Movie
1. A Must See
1. Love It
1. A Classic
1. "Perfect" 
 
### Story

The story is the driving force, the life blood of any medium. It's what brings us back time and again to the same movies, books, music, people: the story they tell and how it connects with us. We are experiential beings, we learn by living through something physically, mentally, or emotionally. Until you experience something, it's not part of you. Once you experience something, it's always a part of you.
Stories are experiences communicated to us by storytellers. For this reason, this is given the greatest weight in the overall rating analysis, not combined or influenced by any other categories until the final average.

**Questions to ask:**

> What is the story?

> What is unique, interesting, or challenging about the story?

> How well does the genesis fit the story?

> How well does the ending fit the story?

> What makes this story worth telling?

**Breakdown**

1. I'm staring at a blank screen
1. The story is nonsense
1. The story is not very relatable or meaningful
1. The story is confusing and I'm not sure what the point is
1. The story isn't important
1. The story is basic and serves as a setting for the characters
1. The story is interesting and challenges my expectations
1. The story is interesting and challenges the norm in meaningful ways
1. The story is interesting and full of meaningful exploration
1. The perfect story. Meaningful. Powerful, Timeless.

---

### Humanities

Since the beginning, stories have been used to explore and explain humanity. One of the greatest gifts a movie can offer is to make you look in and around, to truly observe and take stock of who we are and what we're doing here.

#### Character

Characters are our window into a story. As the audience the characters are our chance to place ourselves in the story.

> "That's just like me.." 

> "That makes me think of this person I know..."

> "I can relate because I feel the same..."

> "I can relate because I feel the opposite..."

Characters are used to explore nature. They can be an unchanging rock to explore other characters or aspects of the world, or they can grow stronger or weaker as the story goes. They show us our own ability to stand firm, adapt, hurt, heal, create and destroy. Whether they are meant to be a mirror for the audience to see themselves or represent someone or something bigger than themselves, characters give a story substance and influence in our minds and hearts.

**Questions to ask:**

> Who are the characters?

> Do the characters experience meaningful development?

> Are the characters the same throughout? Or, in the end, changed?

> Are the characters meaningful and/or relatable?

> Is the dialogue natural/fitting for the characters involved?


**Breakdown**

1. I saw a dead bird in the parking lot and went home
2. The characters make no sense and served no purpose
3. The characters are not very relatable
4. The characters are inconsistent and their motives are confusing
5. The characters are somewhat predictable and bland
6. The characters are interesting and relatable
7. The characters are relatable and experience meaningful growth
8. The characters are well-realized, nuanced, and experience meaningful growth
9. The characters are enthralling. I want to know more about them.
10. I would watch a movie of these characters just talking to one another

---

#### Performance

A character is intimately tied to those portraying them. Whether an in-person actor or performer, a motion capture artist, or a voice actor, these people bring characters to life. They are charged with taking a script, an archetype or shell of a character and make them be, to step on the screen and into our lives.

**Questions to ask:**

> Who are the performers?

> Do the performances enhance the characters and story?

> Do the performances detract from the characters or distract from the story?

> How is the chemistry between performers?

> Do you find yourself observing characters? or only the performers behind them?

**Breakdown**

1. They just cast that dead bird from the parking lot
2. The performers clearly don't want to be in this movie
3. The performers don't portray the characters well
4. The performers are distracting
5. The performers are fine, I don't notice them much
6. Some/most of the performances are good
7. The performers have good chemistry and really bring the characters to life
8. Excellent performance, I have a hard time imagining a different cast
9. Perfectly cast with stand-out performances
10. Perfectly cast, delivering the performance of a lifetime

--- 

### Atmosphere

Setting the stage, that's the atmosphere. What do you see and hear? It almost always creates your first and lasting impression of a movie. So much can be communicated in the in-between moments, the intangibles of a story.

#### Visuals

The way a movie is presented has many factors: is it live or animated? Do they use practical effects or CG? How is the camera treated, is it in the story or an outside observer? Do the shots show intimacy or distance? 

There are cues everywhere that dictate how we perceive the world and what we expect. Imagery, symbolism, body language all combine to create a whole world in the metadata of our mind. How is this used in the movie?

**Questions to ask:**

> Is there anything notable, interesting, or odd about the visual presentation?

> Does the presentation enhance the story-telling?

> Is there any major imagery or symbolism?

> Is the presentation able to pull you into a world outside of your own?

> What do the individual frames (stills) portray? Are they intentional?

**Breakdown**

1. I think it's a radio drama actually...
1. The visuals make it hard to watch/follow
1. The visuals are constantly distracting
1. The visuals are fine, but some of the choices are distracting
1. There is nothing notable about the visuals
1. There are a couple scenes with striking visuals
1. The visuals are good and really enhance the story-telling
1. There are a lot of effective visuals with a lot of imagery
1. There are constantly powerful visuals with striking imagery
1. The visuals tell a story on their own
   
--- 

#### Soundtrack

Music and sound effects are powerful. What we hear has the power to pull on our experience and emotion to send us reeling into worlds of meaning that cannot be scripted.

Hearing is a non-voluntary sense. We cannot close our ears or hear away. As such, what we hear or don't hear speaks volumes simply due to our expectations. Does a movie play on those expectations or leverage them in any way?

**Questions to ask:**

> What is the tone of the movie audio?

> Is there a soundtrack? Does it enhance the tone of the story/characters?

> Are the sound effects what you expected?

> Are your experiences or emotions affected at all by the audio choices?

**Breakdown**

1. Oh, this was a talkie?
1. The soundtrack is apparently just the director's garbage playlist
1. The soundtrack is distracting and doesn't fit the scenes well
1. The soundtrack is mostly fine, but a little distracting
1. There is nothing notable about the soundtrack
1. The music/sounds in a couple scenes really enhance the impact
1. The soundtrack is good and enhances the story-telling
1. A lot of the songs are clearly intentionally chose to fit the scenes
1. Every song and sound is intentional and impactful
1. The soundtrack is used to tell a story of its own

## Solid PODs

All data for this app is stored in [Solid PODs](https://solid.inrupt.com/how-it-works). Before you begin using the app or developing you will need to [register for a pod](https://solid.inrupt.com/get-a-solid-pod).

Your POD will be your login and your data store for the app.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
