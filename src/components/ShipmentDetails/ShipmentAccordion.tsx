/* eslint-disable react/destructuring-assignment */
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  Tag,
  Text,
} from '@chakra-ui/react';

import './index.less';

import { formatDate } from '../../utils/general';
import { Shipment } from '../../utils/type';

export function ShipmentAccordion(currentData: any) {
  const data: Shipment = currentData.currentData;
  const time = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <AccordionItem borderTop="0px">
      <h2>
        <AccordionButton>
          <Box marginRight="auto" textAlign="left">
            <Text className="acc-text">SHIPMENT</Text>
          </Box>
          <AccordionIcon color="gray" />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={Object.keys(data)?.length ?? 15}>
        <Grid columnGap="25px" rowGap="10px" templateColumns="30% 70%">
          <Box>
            <Text size="xs" className="item-key">
              Status
            </Text>
          </Box>
          <Box>
            <Tag
              size="lg"
              variant="outline"
              color={data?.status === 'Delivered' ? 'green' : 'red'}
              textAlign="center"
              border="1px solid"
            >
              {data?.status ?? 'Unknown'}
            </Tag>
          </Box>
          <Box>
            <Text size="xs" className="item-key">
              Delivered time
            </Text>
          </Box>
          <Box>
            <Text size="xs" className="item-content">
              {(data?.deliveredTime && formatDate(data?.deliveredTime, time)) ??
                'unknown'}
            </Text>
          </Box>
          <Box>
            <Text size="xs" className="item-key">
              Delivery address
            </Text>
          </Box>
          <Box>
            <Text size="xs" className="item-content">
              {data?.deliveryAddress ?? 'unknown'}
            </Text>
          </Box>
          <Box>
            <Text size="xs" className="item-key">
              Last updated
            </Text>
          </Box>
          <Box>
            <Text size="xs" className="item-content">
              {(data?.lastUpdate && formatDate(data?.lastUpdate, time)) ??
                'unknown'}
            </Text>
          </Box>
          <Box>
            <Text size="xs" className="item-key">
              Total transit time
            </Text>
          </Box>
          <Box>
            <Text size="xs" className="item-content">
              {data?.totalTransit ?? 'unknown'}
            </Text>
          </Box>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}
