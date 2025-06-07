import React from 'react'

const Alert = (props) => {
    return (
        <div><marquee className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            {props.message}
        </marquee>
        
        </div>
    )
}

export default Alert