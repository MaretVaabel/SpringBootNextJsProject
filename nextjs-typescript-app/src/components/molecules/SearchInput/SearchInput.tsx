'use client'
import { Root } from '@radix-ui/react-form'
import TextInput from 'components/molecules/TextInput/TextInput'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const SearchInput = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <Root onSubmit={(e) => e.preventDefault()}>
      <TextInput
        name={'search'}
        ariaLabel={'search'}
        type="text"
        isSearch
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </Root>
  )
}

export default SearchInput
