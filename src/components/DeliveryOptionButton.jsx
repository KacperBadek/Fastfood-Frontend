export default function DeliveryOptionButton({handler, text}) {

    return(
        <button onClick={handler}>{text}</button>
    )
}