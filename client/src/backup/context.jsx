import React, { Component } from 'react'

export const DataContext = React.createContext

const DataProvider = () => {
    
    return(
        <DataContext.Provider
            value={{

            }}
        >
            {this.props.children}
        </DataContext.Provider >
    )
}
export default DataContext