import { useEffect, useState } from "react"
import xmlJs from 'xml-js'

function App() {

    // const [xmlData, setXmlData] = useState(null)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        fetch('http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/thing?id=013,14')
            .then((res) => {
                return res.text()
            })
            .then((xmlText) => {
                // const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 4 })
                // setXmlData(JSON.parse(jsonData))
                const parser = new DOMParser()
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
                setName(xmlDoc.getElementsByTagName('name')[1].getAttribute('value'))
                setImage(xmlDoc.getElementsByTagName('image')[0].childNodes[0].nodeValue)
            })
    }, [])



    return (
        <>
            {/* {xmlData ? (
                <pre>{JSON.stringify(xmlData, null, 4)}</pre>
            ) : (
                    <p>Loading XML data...</p>
            )} */}
            <p>{name}</p>
            <img src={image} />
        </>
    )
}

export default App
