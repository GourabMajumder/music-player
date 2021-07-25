import React from 'react'
import './css/style.css'


const getLocalItems = () => {
    let list = localStorage.getItem('lists')
    console.log(list)
    if (list) {
        return JSON.parse(localStorage.getItem('lists'))
    } else {
        return []
    }
}


export const Todo = () => {


    const [inputData, setData] = React.useState('')
    const [items, setItems] = React.useState(getLocalItems())
    const [toggle, setToggle] = React.useState(true)
    const [updateVal, setUpdate] = React.useState(null)

    const addItem = () => {
        if (!inputData) {

        } else if (inputData && !toggle) {

            setItems(
                items.map((val) => {
                    if (val.id === updateVal) {
                        return { ...val, name: inputData }
                    }
                    return val
                })
            )

            setToggle(true)
            setData('')
            setUpdate(null)

        } else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData])
            setData('')
        }
    }

    const delItem = (id) => {
        console.log(id)
        const updateItems = items.filter((val) => {
            return id !== val.id
        })
        setItems(updateItems)
    }

    const removeAll = () => {
        setItems([])
    }

    const editItem = (id) => {
        const editItem = items.find((val) => {
            return val.id === id
        })
        setData(editItem.name)
        setToggle(false)
        setUpdate(id)
    }

    //add data to localStorage
    React.useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])


    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <h1 className="title">My Todo List</h1>

                    <div>
                        <input type="text" placeholder="Add items"
                            value={inputData}
                            onChange={(e) => { setData(e.target.value) }} />
                        {
                            toggle ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i> : <i className="far fa-edit update add-btn" title="Update Item" onClick={() => { addItem() }}></i>
                        }
                    </div>

                    <div className="showItems">

                        {
                            items.map((val) => {
                                return (
                                    <div className="eachItem" key={val.id}>
                                        <h3>{val.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => { editItem(val.id) }}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => { delItem(val.id) }}></i>
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="showItems">
                        <button onClick={removeAll} className="btn " ><span>Delete List</span></button>
                    </div>

                </div>
            </div>
        </>
    )
}
