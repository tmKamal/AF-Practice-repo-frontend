import React from 'react';
import UserItems from '../user-items/user-items';
import './user-list.scss';

const UserList=(props)=>{
    return(
        <ul className='users-list'>
            {props.items.map((user=><UserItems
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places.length}
            >

            </UserItems>))}
        </ul>
    )
}
export default UserList;    