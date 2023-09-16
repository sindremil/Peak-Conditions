interface Props {
  destination : string
}

export default function DestinationPage( {destination} : Props ) {

  return (
    <h1>{destination}</h1>
  )
}