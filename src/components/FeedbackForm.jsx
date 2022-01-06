import { useState,  useContext, useEffect } from 'react'
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext'


const FeedbackForm = () => {  
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');
  
  const {addFeedback, feedbackEdit, updateFeedback} =  useContext(FeedbackContext)

  useEffect(() => {
    console.log('hello useEffect');
    if(feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (event) => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at the last 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    // console.log(event.target.value)
    setText(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10) {
      const newFeedback = {
        text: text,
        rating
      }

      if (feedbackEdit.edit === false) {
        addFeedback(newFeedback)
      } else {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      }

      // console.log(newFeedback)
      
      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How Would you rate your service with us? </h2>
        <RatingSelect select={(rating)=> setRating(rating)}/>
        <div className="input-group">
          <input 
            onChange={handleTextChange} 
            type="text" 
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
