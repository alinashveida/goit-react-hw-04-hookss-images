import Loader from 'react-loader-spinner'
import { SppinerContainer } from './Spinner.styled'

export default function Spinner() {
  return (
    <SppinerContainer>
      <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={0}
      />
    </SppinerContainer>
  )
}
