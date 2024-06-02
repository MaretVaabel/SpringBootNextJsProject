import { FC, useMemo, useState } from 'react'
import { includes, keys, map, size } from 'lodash'
import SortingArrows from 'assets/icons/sorting_arrows.svg'
import SortingMore from 'assets/icons/sorting_more.svg'
import SortingLess from 'assets/icons/sorting_less.svg'

import classes from './classes.module.scss'
import Button, {
  AppearanceTypes,
  SizeTypes,
} from 'components/molecules/Button/Button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SelectionInput from '../SelectionInput/SelectionInput'
import { MovieCategories } from 'app/api/actions'

interface HeaderItemProps {
  name?: string
  hasSorting?: boolean
  hasFiltering?: boolean
  filteringOptions?: {
    label: string
    value: string
  }[]
}

const HeaderItem: FC<HeaderItemProps> = ({
  name,
  hasSorting,
  hasFiltering,
  filteringOptions,
}) => {
  const [currentSorting, setCurrentSorting] = useState<string>('')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const sortingOption = ['asc', 'desc']
  const params = new URLSearchParams(searchParams)

  const [step, setStep] = useState<number>(0)

  const handleOnSorting = () => {
    const newStep = size(sortingOption) > step ? step + 1 : 0

    if (!sortingOption[step]) {
      params.delete(`${name}-sort`)
      replace(`${pathname}?${params.toString()}`)
    } else {
      params.set(`${name}-sort`, sortingOption[step])
      replace(`${pathname}?${params.toString()}`)
    }

    setStep(newStep)
    setCurrentSorting(sortingOption[step])
  }
  const Icon = useMemo(() => {
    switch (currentSorting) {
      case 'asc': {
        return SortingLess
      }
      case 'desc': {
        return SortingMore
      }
      default: {
        return SortingArrows
      }
    }
  }, [currentSorting])

  const handleOnFiltering = (value: string) => {
    if (value === filteringOptions?.[0].value) {
      params.delete(`${name}-filter`)
      replace(`${pathname}?${params.toString()}`)
    } else {
      params.set(`${name}-filter`, value)
      replace(`${pathname}?${params.toString()}`)
    }
  }

  console.log(name)
  return (
    <div className={classes.headingWrapper}>
      <Button
        hidden={!hasSorting}
        onClick={handleOnSorting}
        appearance={AppearanceTypes.Text}
        size={SizeTypes.S}
        icon={Icon}
        ariaLabel={'sort'}
        className={classes.iconButton}
      />

      {hasFiltering ? null : name}

      <SelectionInput
        hidden={!hasFiltering}
        className={classes.selectInput}
        ariaLabel={'categories'}
        value={
          searchParams.get(`${name}-filter`) || filteringOptions?.[0].value
        }
        options={filteringOptions || []}
        onChange={handleOnFiltering}
        name={name || ''}
      />
    </div>
  )
}

interface HeaderGroupProps {
  headings: string[]
}

const TableHeaderGroup: FC<HeaderGroupProps> = ({ headings }) => {
  const movieKeys = keys(MovieCategories) as Array<keyof typeof MovieCategories>
  const categoryOptions = map(['All categories', ...movieKeys], (key) => {
    return {
      label: key,
      value: key,
    }
  })
  return (
    <thead>
      <tr>
        {map(headings, (name, key) => (
          <th key={key}>
            <HeaderItem
              name={name}
              hasSorting={includes(['name', 'rate'], name)}
              hasFiltering={includes(['category'], name)}
              filteringOptions={categoryOptions}
            />
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeaderGroup
