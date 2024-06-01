'use client'
import React from 'react'
import classes from './classes.module.scss'

import Button, {
  AppearanceTypes,
  SizeTypes,
} from 'components/molecules/Button/Button'

import Container from 'components/atoms/Container/Container'
import NewMovieForm from 'components/molecules/NewMovieForm/NewMovieForm'

const NewMovie = () => {
  return (
    <Container className={classes.moviesContainer}>
      <Button
        ariaLabel={'back'}
        size={SizeTypes.S}
        appearance={AppearanceTypes.Secondary}
        className={classes.button}
        href={'/'}
        label={'Go Back'}
      />
      <h1>{'New movie form'}</h1>
      <NewMovieForm />
    </Container>
  )
}

export default NewMovie
