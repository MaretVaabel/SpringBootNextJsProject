import React, { FC } from 'react'
import classes from './classes.module.scss'
import { keys, map, toString } from 'lodash'
import { MovieType } from 'app/api/actions'
import { Control } from 'react-hook-form'
import CheckBoxInput from 'components/molecules/CheckBoxInput/CheckBoxInput'
import { FormValues } from 'components/molecules/MoviesForm/MoviesForm'
import SwitchInput from 'components/molecules/SwitchInput/SwitchInput'
import TableHeaderGroup from '../TableHeaderGroup/TableHeaderGroup'

interface DataTablePropTypes {
  control: Control<FormValues>
  data: MovieType[]
}

const DataTable: FC<DataTablePropTypes> = ({ control, data }) => {
  const headings = ['', ...keys(data[0])]

  return (
    <table className={classes.dataTable}>
      <TableHeaderGroup headings={headings} />
      <tbody>
        {map(data, (value, key) => (
          <tr key={key}>
            <td>
              <CheckBoxInput id={toString(value.id)} control={control} />
            </td>
            <td>{value.id}</td>
            <td>{value.name}</td>
            <td>{value.category}</td>
            <td>{value.rate}</td>
            <td>{value.year}</td>
            <td>
              <SwitchInput
                control={control}
                id={value.id}
                ariaLabel={value.name}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
