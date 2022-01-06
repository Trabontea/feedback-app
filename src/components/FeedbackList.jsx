import React from 'react';
import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
// import PropTypes from 'prop-types'
import Spinner from './shared/Spinner';
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {
  // console.log(feedback)

  const {feedback, isLoading} = useContext(FeedbackContext)

  if(!isLoading && (!feedback || feedback.length === 0)) {
    return <p> No feedback Yet</p>
  }

  return isLoading ? <Spinner /> : (
      <div className='feedback-list'>
        <AnimatePresence>
        {feedback.map((item) => (
          <motion.div 
            key={item.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity:0}}
          >
            <FeedbackItem 
              key={item.id} 
              item={item}
            />
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
    )
}

// FeedbackList.propTypes = {
//   feedback: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       text: PropTypes.string.isRequired,
//       rating: PropTypes.number.isRequired,
//     })
//   )
// }

export default FeedbackList
