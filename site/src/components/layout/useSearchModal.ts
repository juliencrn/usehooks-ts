import { useEffect } from 'react'

import { useLocation } from '@reach/router'
import { useBoolean } from 'usehooks-ts'

const useSearchModal = (): [boolean, Record<string, () => void>] => {
  const { value, setTrue: openModal, setFalse: closeModal } = useBoolean(false)
  const location = useLocation()

  useEffect(() => {
    closeModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return [value, { openModal, closeModal }]
}

export default useSearchModal
