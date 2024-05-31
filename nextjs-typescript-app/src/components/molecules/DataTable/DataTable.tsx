import React, { FC } from 'react'
import classes from './classes.module.scss'
import { keys, map, toString } from 'lodash'
import { MovieState, MovieType } from 'app/api/actions'
import { Control } from 'react-hook-form'
import MoviesStateToggle from 'components/molecules/MoviesStateToggle/MoviesStateToggle'
import CheckBoxInput from 'components/molecules/CheckBoxInput/CheckBoxInput'
import { FormValues } from 'components/molecules/MoviesForm/MoviesForm'

interface DataTablePropTypes {
  control: Control<FormValues>
  data: MovieType[]
}

const DataTable: FC<DataTablePropTypes> = ({ control, data }) => {
  const headings = ['', ...keys(data[0])]

  return (
    <table className={classes.dataTable}>
      <thead>
        <tr>
          {map(headings, (name, key) => (
            <th key={key}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {map(data, (value, key) => (
          <tr key={key}>
            <td>
              <CheckBoxInput
                name={value.name}
                id={toString(value.id)}
                control={control}
              />
            </td>
            <td>{value.id}</td>
            <td>{value.name}</td>
            <td>{value.category}</td>
            <td>{value.rate}</td>
            <td>{value.year}</td>
            <td>
              <MoviesStateToggle
                id={`${value.id}-${value.name}`}
                name={`${value.id}-${value.name}`}
                label={value.state}
                value={value.state === MovieState.Activated}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
