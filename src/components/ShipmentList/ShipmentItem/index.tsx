import { Box, Tag, TagLabel, Text } from '@chakra-ui/react';

import './index.less';

import { Shipment } from '../../../utils/type';

export function ShipmentItem(shipment: Shipment) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const { trackingId, lastUpdate, status } = shipment;

  return (
    <Box className="box">
      <Box className="text-box">
        <Text fontSize="sm" color="black" fontWeight={500}>
          {trackingId}
        </Text>
        <Text fontSize="xs" color="gray">
          Created: {formatDate(lastUpdate!)}
        </Text>
      </Box>
      <Tag
        size="lg"
        className="tag"
        variant="outline"
        marginLeft="125px"
        color={status === 'Delivered' ? 'green' : 'red'}
      >
        <TagLabel>{status}</TagLabel>
      </Tag>
    </Box>
  );
}
