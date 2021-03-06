import React from 'react';
import StoreEntry from './StoreEntry.js'

const Stores = props => {
    if(!props.stores) {
        return <div></div>
    } else {
        return (
                props.stores.map( (store) => {
                    return <StoreEntry key={store.properties.id} store={store} />
                })
        )

    }
}
export default Stores;