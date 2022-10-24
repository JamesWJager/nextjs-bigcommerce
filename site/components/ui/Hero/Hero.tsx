import React, { FC } from 'react'
<<<<<<< HEAD
import { Container } from '@components/ui'
import { ArrowRight } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
interface HeroProps {
  className?: string
  headline: string
  description: string
}

const Hero: FC<HeroProps> = ({ headline, description }) => {
  return (
    <div className="bg-accent-9 border-b border-t border-accent-2">
      <Container>
        <div className={s.root}>
          <h2 className={s.title}>{headline}</h2>
          <div className={s.description}>
            <p>{description}</p>
            <Link href="/">
              <a className="flex items-center text-accent-0 pt-3 font-bold hover:underline cursor-pointer w-max-content">
                Read it here
                <ArrowRight width="20" heigh="20" className="ml-1" />
=======
import Storyblok from '@lib/storyblok'
import { SbEditableContent } from 'storyblok-react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
interface Props {
  className?: string
  headline: string
  description: string
  blok?: SbEditableContent
}

const Hero: FC<Props> = ({ headline, description, blok }) => {
  const renderedDescription = (blok && Storyblok.richTextResolver) ? Storyblok.richTextResolver.render(blok.description) : description
  const bg = blok?.color ? blok.color.color : '#000'
  return ( 
    <div style={{ backgroundColor: bg }}>
      <Container>
        <div className={s.root}>
          <h2 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {blok?.headline || headline}
          </h2>
          <div className="flex flex-col justify-between">
            <div className="mt-5 text-xl leading-7 text-accent-2 text-white" dangerouslySetInnerHTML={
              {__html: renderedDescription }
            } />
            <Link href="/blog">
              <a className="text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content">
                Read it here
                <RightArrow width="20" heigh="20" className="ml-1" />
>>>>>>> parent of f3a6202 (testing)
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
