import React, { Dispatch, FC, SetStateAction } from 'react'
import classes from './classes.module.scss'
import Button, {
  AppearanceTypes,
  SizeTypes,
} from 'components/molecules/Button/Button'

interface PaginationTYpes {
  numberOfPages?: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  currentPage: number
}

const TablePagination: FC<PaginationTYpes> = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}) => {
  const nextPage = () => {
    if (currentPage != numberOfPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }
  return (
    <div className={classes.paginationContainer}>
      <Button
        appearance={AppearanceTypes.Text}
        size={SizeTypes.S}
        ariaLabel={'prev_page'}
        onClick={() => prevPage()}
        className={classes.button}
      >
        {'Prev'}
      </Button>
      <div className={classes.pageNumbers}>
        <span>{currentPage}</span>
        <span>/</span>
        <span>{numberOfPages}</span>
      </div>
      <Button
        appearance={AppearanceTypes.Text}
        size={SizeTypes.S}
        ariaLabel={'next_page'}
        onClick={() => nextPage()}
        className={classes.button}
      >
        {'Next'}
      </Button>
    </div>
  )
}

export default TablePagination
