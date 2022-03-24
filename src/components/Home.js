import React from 'react'
import GuidePreview from './GuidePreview'

const guidePreviews = [
  {
    title: 'guide1 - how to a',
    username: 'leeroyJenkins',
    favorites: 23,
    tags: ['tagA', 'tagB', 'tagC', 'tagD', 'tageE'],
    guideId: 23,
  },
  {
    title: 'guide2 - how to b',
    username: 'Howitzer',
    favorites: 567,
    tags: ['tagE', 'tagA', 'tagD', 'tagF', 'tagG'],
    guideId: 24,
  },
  {
    title: 'guide3 - how to c',
    username: 'YouWishYouWereMe',
    favorites: 9999,
    tags: ['tagA', 'tagF', 'tagD', 'tagC', 'PikaPii'],
    guideId: 25,
  },
  {
    title: 'guide4 - how to d',
    username: 'AttackOnFullstack',
    favorites: 2,
    tags: ['tagF', 'tagC', 'tagB', 'tagA', 'TagJ'],
    guideId: 26,
  },
  {
    title: 'guide5 - how to e',
    username: '0m4R',
    favorites: 48,
    tags: ['tagG', 'tagX', 'tagZ', 'tagF', 'tagNine'],
    guideId: 27,
  },
]

export const Home = () => {
  return (
    <div id="home">
      <div>
        <div>About:</div>
        <div>
          You really think you can fly that thing? What do they got in there? King Kong? Must go
          faster... go, go, go, go, go! You're a very talented young man, with your own clever
          thoughts and ideas. Do you need a manager? Hey, take a look at the earthlings. Goodbye!
          Remind me to thank John for a lovely weekend. Yeah, but your scientists were so
          preoccupied with whether or not they could, they didn't stop to think if they should. Just
          my luck, no ice. Remind me to thank John for a lovely weekend. They're using our own
          satellites against us. And the clock is ticking.
        </div>
      </div>
      <div>README Categories</div>
      <div>New README</div>
      <div>
        <GuidePreview props={guidePreviews} />
      </div>
    </div>
  )
}

export default Home
