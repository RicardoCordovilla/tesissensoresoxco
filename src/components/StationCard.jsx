import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../config'
import { useNavigate } from 'react-router'


const StationCard = ({ info }) => {
    console.log(info)
    const navigate = useNavigate()

    const [itemInfo, setItemInfo] = useState()
    const [dbUpdated, setDbUpdated] = useState(0)

    const digits = (num) => {
        let digit = num < 10 ? '0' + num : num + ''
        return digit
    }

    const formatDate = (date) => {
        const fecha = new Date(date)
        let stringDate = digits(fecha.getDate()) + '-' + digits(fecha.getMonth() + 1) + '-' + fecha.getFullYear()
        return stringDate
    }

    const formatTime = (date) => {
        const time = new Date(date)
        let stringTime = digits(time.getHours() + ':' + digits(time.getMinutes()))
        return stringTime
    }


    const getItemInfo = () => {
        if (info.title) {
            let url = config.db.baseurl + 'registers/' + info.title + '/last'
            console.log(url)
            axios.get(url)
                .then(response => {
                    console.log(response.data)
                    setItemInfo(response.data)
                })
                .catch(err => console.log(err))
        }
    }


    useEffect(() => {
        getItemInfo()
        const interval = setInterval(() => getItemInfo(), 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='stationCard'>
            <span
                className='stationTitle'
                onClick={() => itemInfo && navigate('/' + info?.title)}
            >{info?.alias}</span>

            <div className="sensorInfoContainer">
                <span className='infoLabel'>CO:</span>
                <span className='infoText'>{itemInfo ? itemInfo?.values?.CO : 'sin datos'}</span>
            </div>
            <div className="sensorInfoContainer">
                <span className='infoLabel'>OX:</span>
                <span className='infoText'>{itemInfo ? itemInfo?.values?.OX : 'sin datos'}</span>
            </div>
            <div className="sensorInfoContainer">
                <span className='infoLabel'>Fecha:</span>
                <span className='infoText'>{itemInfo ? formatDate(itemInfo?.createdAt) : '-'}</span>
            </div>
            <div className="sensorInfoContainer">
                <span className='infoLabel'>Hora:</span>
                <span className='infoText'>{itemInfo ? formatTime(itemInfo?.createdAt) : '-'}</span>
            </div>
        </div>
    )
}

export default StationCard