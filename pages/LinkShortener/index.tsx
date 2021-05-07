import { ReactEventHandler, useState } from 'react'
import styles from './LinkShortener.module.css'

const LinkShortener = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(e.target.value)
  }

  const handleShort = () => {
    fetchApi()
  }

  const fetchApi = () => {
    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 8d81753ecbfca2e3e8a0726dcb0436f01f2dd92c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: 'bit.ly',
        long_url: longUrl
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        setShortUrl(data.link)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <div className={styles.outContainer}>
      <p>短链生成器</p>
      <div className={styles.innerContainer}>
        <input type='text' value={longUrl} onChange={handleInputChange} />
        <button onClick={handleShort}>生成</button>
      </div>
      <a href={shortUrl}>{shortUrl}</a>
    </div>
  )
}

export default LinkShortener
