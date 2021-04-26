import React from 'react';
import StoreEntry from './storeEntry'

const Stores = props => {
    console.log(props.stores)
    if(!props.stores) {
        return <div></div>
    } else {
        console.log(props.stores[0])
        return (
                props.stores.map( (store, index) => {
                    return <StoreEntry key={store.properties.id} store={store} />
                    // console.log(store)
                    // return <div>{store.geometry.coordindates}</div>
                })
        )

    }
}
export default Stores;