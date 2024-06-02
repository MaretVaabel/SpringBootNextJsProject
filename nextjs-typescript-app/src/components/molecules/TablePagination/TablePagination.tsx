import React, { FC, useEffect } from 'react'
import classes from './classes.module.scss'
import Button, {
  AppearanceTypes,
  SizeTypes,
} from 'components/molecules/Button/Button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface PaginationTYpes {
  numberOfPages?: number
}

const TablePagination: FC<PaginationTYpes> = ({ numberOfPages }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const currentPage = Number(searchParams.get('page')) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return replace(`${pathname}?${params.toString()}`)
  }

  const nextPage = () => {
    if (currentPage != numberOfPages) {
      createPageURL(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage != 1) {
      createPageURL(currentPage - 1)
    }
  }

  useEffect(() => {
    createPageURL(1)
  }, [])

  return (
    <div className={classes.paginationContainer}>
      <Button
        appearance={AppearanceTypes.Text}
        size={SizeTypes.S}
        ariaLabel={'prev_page'}
        onClick={() => prevPage()}
        className={classes.button}
        label={'Prev'}
      />
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
        label={'Next'}
      />
    </div>
  )
}

export default TablePagination
