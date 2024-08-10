"use client"

import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import LinkItem from './LinkItem'

const Header = () => {

    const { data: session } = useSession()
    
    return (
        <div className='flex items-center justify-between mt-3'>
            <Image
                src="/trashify.png"
                className='rounded-full ml-10'
                width={40}
                height={40}
                alt="Trashify Logo"
            />   

            <div className='flex'>
                <LinkItem title='Home' target_path='/' />
                <LinkItem title='Post' target_path='/post' />
                <LinkItem title='Manage' target_path='/manage' />
            </div>
            <img
                className="rounded-full w-7 h-7 mr-10"
                src={session?.user?.image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAaVBMVEX///8AAADs7Oz7+/uFhYXj4+P39/eNjY3W1taRkZHR0dEtLS19fX2VlZXg4OCIiIgoKCg0NDQgICCtra0+Pj4bGxubm5tDQ0MSEhKkpKRJSUnJycm2trZ2dnZRUVEJCQnAwMBpaWlZWVncDv32AAADvUlEQVR4nO2abX+6LBSAJ+ZDWJrlLDOf+v4f8j8TpyEiCNju332uF3uxZVwDPHDgfH0BAAAAAAAAAAAAAAAAwBdC+JKlx479GE+M/Tvkm45pVvvIXaWE94llkGfmSCvZ6cmkUsu1lpUqTCu1ZHJO2RZOlhXKOCGj02mg+YMdZZ2xuJN96J8KCi8lQaGLA/toYLeWouy/X2JWoTt5Jp2GE1sDLvLJu+2JS4Xf0o/IcuxaaMRjqE86CpmTyrsWSvEmiNRp3VIghNM1cZeWutvmpFDXxFV8rdlOKpGWulJSbsufknJzL6l+Ateh1jL9V0slo24Jm6oPeM/8j0g9zqPFoUq1ScUKUg9qzTp+TirupdyKkrIkFlJTUgfaySpV30JlqTCeSFmPT0kFRIqeUS2RYmBVljoypCQWLSNSLiuJCBa/zeFqK0s1K6RQk1x520pVKXvHkFrYCOWvYFvMv6NEKhDPZ6j9FCuN2HEnOg66TxX6pc5EKv+eSnFDwhBDImNSjHSZGzzxKK7N9ai6lDOR4m0UwrdMdqav1KUms2on7GRZe+anHHUpysrjzHJ/kvEz+0peCndPfA9Sdj1q5cKZUA7jFILVVzqkfiZBFLcbmFuw48U7euxmrfRI/UT2Okuzmrtn8a8sJ9YI6pJaxmHscWb6ikidjEv5s07Td2MrKcw9aaOiyGqpm5SUE/Cc6BHcRgovOFErziZSmDOfWCO4hVS42E/UCGqXQiG9w8vP8yZjDr8jqFvKL63yPRnNhfrpZWVIKmyjdjDeu/jCTkPCr1cKk23o5fc3teDYvehPzrVKDb3SW9VyN0sP/VLjlcR7/fkh009GpPDb8UuSh/707MOw1GTtw/RIxYw8R0pKfesycVrDRa8U1qCkW2p5xTUrNc1mxFeSLaX8ybHn56XYWYqClIYMmbf7/pQU0uekLNWfTzHPF/VIrT+I1Xr3rkkKlfNNfExqejoFUpRU/H+TchWlkJ6VmPBQlEo4Nw6fltIbp96l1t8hy+R1S5SOqlSfZOPm/iwi71WbdHhRjH4SOKVJfS1jFGX9WrdaaqhLaOuLhJ8WQoOUfoiUfK1LInWSt5GUZVCK1E/Jlypxr4UUIZn1U1wqvJH/w1hX+SQ34tyd0vwWCp5SxwRh1IctiaoZ5q2xJqrb6Pyhkqm5uJiTeiOWqW6wn9tIydU86TnMWEK26I9V36LdSarIuiVs5A/EpIh5l76z5FlxPek61xhT3YIyevgrlFpcZArX4FoPAAAAAAAAAAAAAAAA/If4B/4LRFxJTWsQAAAAAElFTkSuQmCC'}
            />
        </div>
    )
}

export default Header
