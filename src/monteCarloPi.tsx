import React, {useState, useEffect} from 'react'
import { Button } from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/material/styles';



const MonteCarloPI = () => {
    
    const N: number = 10000
    const DIM = 100
    const [matrice, setMatrice] = useState<number[][]>([])
    const [matriceElements, setElements] = useState<JSX.Element[]>([])
    const [total, setTotal] = useState<number>(-1)
    const [inside, setInside] = useState<number>(0)

    useEffect(() => {
        let tmpMatrice: number[][] = []
        for (let x = 0; x < DIM; x++){
            let row = []
            for (let y = 0; y < DIM; y++){
                row.push(0)
            }
            tmpMatrice.push(row)
        }
        setMatrice(tmpMatrice)
        setTotal(0)
    }, [])

    useEffect(() => {
        if (!matrice.length) return
        console.log("Hallo")
        let tmpMatriceElements: JSX.Element[] = []
       for (let x = 0; x < DIM; x++){
           for (let y = 0; y < DIM; y++){
                let color: string = ""
               if ((x*x + y*y) < 100*100 ){
                color = `rgb(255, ${230-15*matrice[x][y]}, 255)`
               }
               else{
                color = `rgb(${230-15*matrice[x][y]}, 255, 255)`
               }

                tmpMatriceElements.push(<div className = "matrice-item" style = {{backgroundColor : color}}> </div>)
           }
       }
       setElements(tmpMatriceElements)
    }, [total])

    const simulate = () =>{
        let ins = inside
        let tmpMatrice: number[][] = matrice.map(x => x)
        for (let i = 0; i < N; i++){
            let x = Math.random()
            let y = Math.random()

            if ((x*x + y*y) < 1){
                ins += 1
            }
            x = Math.floor(x * 100)
            y = Math.floor(y * 100)
            tmpMatrice[x][y] = tmpMatrice[x][y] + 1
        }
 
        setTotal(total + N)
        setInside(ins)
    }

    return (
    <div>
        {inside ? <p>simulated PI = {inside/total * 4}</p> : <></>}
        <p>PI = 3.14159265359</p>
        <Button  variant="contained" color = "primary" onClick = {() => simulate()}> Simulate </Button>
        <div className = "matrice">{matriceElements}</div>
    </div>
    )
}

export default MonteCarloPI
