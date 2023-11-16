/* eslint-disable */
import { useCallback, useMemo, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Box, Button, SkeletonText, Text } from '@chakra-ui/react';
import { ArrowUpDownIcon } from '@chakra-ui/icons'

import { ShipmentItem } from './ShipmentItem';


import { SHIPMENT } from '../../utils/service';
import { Shipment } from '../../utils/type';

import './index.less'
import { ShipmentDetails } from '../ShipmentDetails';

/**
 * sort type:
 * asc: a -> z, old -> new
 * des: z -> a, new -> old
*/
enum SortType {
    Default = 'default',
    Asc = 'asc',
    Des = 'des',
}


export function ShipmentList() {
  const { loading, error, data } = useQuery(SHIPMENT);
  // const loading = false;
  // const error = false;
  // const { data } = {
  //   "data": {
  //       "shipments": [
  //           {
  //               "id": "0eaf9c36-07c7-4d65-8dbf-8e5f2a83de38",
  //               "trackingId": "SHP-12345",
  //               "status": "Delivered",
  //               "statusSeverity": "Success",
  //               "deliveredTime": "2023-10-20T14:30:00Z",
  //               "lastUpdate": "2023-10-20T14:30:00Z",
  //               "deliveryAddress": "123 Main Street, Sydney, NSW, 2000, Australia",
  //               "totalTransit": "2 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "5c8b2405-ef59-4651-bfef-33c0469a5029",
  //               "trackingId": "SHP-98765",
  //               "status": "In-Transit",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-25T08:45:00Z",
  //               "deliveryAddress": "456 Elm Street, Melbourne, VIC, 3000, Australia",
  //               "totalTransit": "15 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "17b6d21f-75e7-4d0e-b4a6-78a746cdf080",
  //               "trackingId": "SHP-54321",
  //               "status": "Manifested",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-22T12:15:00Z",
  //               "deliveryAddress": "789 Oak Street, Brisbane, QLD, 4000, Australia",
  //               "totalTransit": "8 hours",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "af6c0f6c-bfe9-4ca9-8f7b-3b5b1d15c6e1",
  //               "trackingId": "SHP-11111",
  //               "status": "Unknown",
  //               "statusSeverity": "Warning",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-24T20:20:00Z",
  //               "deliveryAddress": "101 Cedar Street, Perth, WA, 6000, Australia",
  //               "totalTransit": "2 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "f3c22084-cc3d-4be0-8e03-5d2d309b947f",
  //               "trackingId": "SHP-77777",
  //               "status": "In-Transit",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-23T16:55:00Z",
  //               "deliveryAddress": "234 Birch Street, Adelaide, SA, 5000, Australia",
  //               "totalTransit": "5 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "a791237b-164c-4d8d-8755-3c91d0abf5d2",
  //               "trackingId": "SHP-54333",
  //               "status": "Delivered",
  //               "statusSeverity": "Success",
  //               "deliveredTime": "2023-10-21T15:30:00Z",
  //               "lastUpdate": "2023-10-21T15:30:00Z",
  //               "deliveryAddress": "789 Elm Street, Brisbane, QLD, 4000, Australia",
  //               "totalTransit": "3 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "b49123d2-0cd4-4e4d-9aae-2c3ef9bbf5d1",
  //               "trackingId": "SHP-98778",
  //               "status": "In-Transit",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-25T10:45:00Z",
  //               "deliveryAddress": "456 Maple Street, Melbourne, VIC, 3000, Australia",
  //               "totalTransit": "12 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "c591f23e-974c-4f8d-8b33-1c4af5cbf7d1",
  //               "trackingId": "SHP-55555",
  //               "status": "Manifested",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-26T12:15:00Z",
  //               "deliveryAddress": "123 Oak Street, Sydney, NSW, 2000, Australia",
  //               "totalTransit": "6 hours",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "d6f59123-743c-4d1d-8a7f-6c4fa4bd8f11",
  //               "trackingId": "SHP-11112",
  //               "status": "Delivered",
  //               "statusSeverity": "Success",
  //               "deliveredTime": "2023-10-22T16:30:00Z",
  //               "lastUpdate": "2023-10-22T16:30:00Z",
  //               "deliveryAddress": "567 Cedar Street, Perth, WA, 6000, Australia",
  //               "totalTransit": "4 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "e4f8a1f4-2c94-4a9d-9c3a-0b3ae6f9bfc5",
  //               "trackingId": "SHP-33333",
  //               "status": "In-Transit",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-23T08:30:00Z",
  //               "deliveryAddress": "101 Birch Street, Adelaide, SA, 5000, Australia",
  //               "totalTransit": "7 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "f3c291b3-0cf4-4c3d-8b1c-0d3ae9fbbcf1",
  //               "trackingId": "SHP-77776",
  //               "status": "Delivered",
  //               "statusSeverity": "Success",
  //               "deliveredTime": "2023-10-24T14:15:00Z",
  //               "lastUpdate": "2023-10-24T14:15:00Z",
  //               "deliveryAddress": "789 Cedar Street, Brisbane, QLD, 4000, Australia",
  //               "totalTransit": "5 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "g4d291b3-0cf4-4c3d-8b1c-0d3ae9fbbcf1",
  //               "trackingId": "SHP-54322",
  //               "status": "In-Transit",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-23T12:30:00Z",
  //               "deliveryAddress": "234 Maple Street, Melbourne, VIC, 3000, Australia",
  //               "totalTransit": "10 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "h4e4912b-4cc4-4f2d-8c3f-2b3cf9bbf5c1",
  //               "trackingId": "SHP-99999",
  //               "status": "Manifested",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-27T10:15:00Z",
  //               "deliveryAddress": "567 Elm Street, Sydney, NSW, 2000, Australia",
  //               "totalTransit": "3 hours",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "i3f56123-743c-4d1d-8a7f-6c4fa4bd8f11",
  //               "trackingId": "SHP-88888",
  //               "status": "Delivered",
  //               "statusSeverity": "Success",
  //               "deliveredTime": "2023-10-26T15:45:00Z",
  //               "lastUpdate": "2023-10-26T15:45:00Z",
  //               "deliveryAddress": "123 Oak Street, Perth, WA, 6000, Australia",
  //               "totalTransit": "6 days",
  //               "__typename": "Shipment"
  //           },
  //           {
  //               "id": "j3f59123-743c-4d1d-8a7f-6c4fa4bd8f11",
  //               "trackingId": "SHP-66666",
  //               "status": "In-Transit",
  //               "statusSeverity": "Info",
  //               "deliveredTime": null,
  //               "lastUpdate": "2023-10-25T08:15:00Z",
  //               "deliveryAddress": "101 Birch Street, Adelaide, SA, 5000, Australia",
  //               "totalTransit": "9 days",
  //               "__typename": "Shipment"
  //           }
  //       ]
  //   }
  // }

  const originalList = [...(data?.shipments || [])];
  // date shown
  const [dateSort, setDateSort] = useState<SortType>(SortType.Default);
  // status shown
  const [statusSort, setStatusSort] = useState<SortType>(SortType.Default);

  const [sortedList, setSortedList] = useState(originalList)

	// drawer
	const [isOpen, setOpen] = useState<boolean>(false)
	const [itemDetail, setItemDetail] = useState<Shipment|null>(null)


  // handle sort
  const handleDate = useCallback((type: 'date'|'status') => {

    if (type === 'date') {
      if (dateSort === SortType.Asc) {
        originalList?.sort((a,b) => {
          return a.lastUpdate.localeCompare(b.lastUpdate);
        })
      } else if (dateSort === SortType.Des) {
  
        originalList?.sort((a,b) => {
          return -a.lastUpdate.localeCompare(b.lastUpdate);
        })
      }
    }

    if (type === 'status') {
      if (statusSort === SortType.Asc) {
        originalList?.sort((a,b) => {
          return a.status.toLowerCase().localeCompare(b.status.toLowerCase()) 
        })
      } else if (statusSort === SortType.Des) {
        originalList?.sort((a,b) => {
          return -a.status.toLowerCase().localeCompare(b.status.toLowerCase()) 
        })
      }
    }

    setSortedList(originalList)
    //return originalList
  }, [dateSort, statusSort])


  const handleDateSort = () => {
    dateSort === SortType.Asc ? setDateSort(SortType.Des) : setDateSort(SortType.Asc)
    handleDate('date')
  }

  const handleStatusSort = () => {
    statusSort === SortType.Asc ? setStatusSort(SortType.Des) : setStatusSort(SortType.Asc)
    handleDate('status')
  }

	const handleItemClick = (shipment: Shipment) => {
		setItemDetail(shipment)
		setOpen(true)
	}

  const renderList = () => {
    if (sortedList?.length > 0) {
      return (
        sortedList?.map((shipment, index) => (
					<Box onClick={() => {handleItemClick(shipment)}} key={shipment?.id ?? index}>
						<ShipmentItem {...shipment} />
					</Box>
          
        ))
      )
    }

    return (
      originalList?.map((shipment, index) => (
        <Box onClick={() => {handleItemClick(shipment)}} key={shipment?.id ?? index}>
          <ShipmentItem key={shipment?.id ?? index} {...shipment} />
        </Box>
      ))
    )
  }


  if (error) {
    return (
      <div className='error-text'>
        <h1>Network Error, please try again later</h1>
      </div>
    );
  }

  if (loading) {
    return (
    <Box padding='6' boxShadow='lg' bg='white' width='100vw' height='90vh'>
      <SkeletonText mt='initial' noOfLines={15} spacing='4' skeletonHeight='4' />
    </Box>
    ) 
  }

  return (
    <Box className='container'>
      <Box className='head'>
        <Button onClick={handleDateSort} className='info-button'>
          <Text fontSize="sm" color='black' fontWeight='400'>
            Shipment
          </Text>
          <ArrowUpDownIcon color='black' boxSize={2.5} marginTop='2px' marginLeft='6px' />
        </Button>
        <Button onClick={handleStatusSort} className='info-button' marginLeft='120px'>
          <Text fontSize="sm" color='black' fontWeight='400'>
            Status
          </Text>
          <ArrowUpDownIcon color='black' boxSize={2.5} marginTop='2px' marginLeft='6px' />
        </Button>
      </Box>
      {renderList()}
			<ShipmentDetails isOpen={isOpen} onClose={() => {setOpen(false)}} shipment={itemDetail} />
    </Box>
  );
}
