import { useQuery } from '@apollo/client';
import {
  Accordion,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  ModalCloseButton,
  SkeletonText,
  Text,
} from '@chakra-ui/react';

import './index.less';

import { TRACKING_EVENTS } from '../../utils/service';
import { Shipment } from '../../utils/type';

import { ShipmentAccordion } from './ShipmentAccordion';
import { TrackingHistory } from './TrackingHistory';

interface IShipmentDetails {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment;
}

export function ShipmentDetails({
  isOpen,
  onClose,
  shipment,
}: IShipmentDetails) {
  const { loading, error, data } = useQuery(TRACKING_EVENTS, {
    variables: { trackingId: shipment?.trackingId || '' },
  });

  const renderFallback = () => (
    <Box className="error-text">
      <header>Network Error, please try again later</header>
    </Box>
  );
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="md"
      onClose={onClose}
      isFullHeight
      colorScheme="light"
    >
      <DrawerOverlay />
      <DrawerContent>
        {loading ? (
          <Box
            padding="6"
            boxShadow="lg"
            bg="white"
            width="100vw"
            height="90vh"
          >
            <SkeletonText
              mt="initial"
              noOfLines={15}
              spacing="4"
              skeletonHeight="4"
            />
          </Box>
        ) : (
          <Box>
            <DrawerHeader className="header">
              <Text size="lg" color="black">
                {shipment?.trackingId}
              </Text>
              <ModalCloseButton className="close" />
            </DrawerHeader>
            <DrawerBody className="content">
              {error ? (
                renderFallback()
              ) : (
                <Accordion defaultIndex={[0, 1]} allowMultiple>
                  <ShipmentAccordion currentData={shipment} />
                  <Box className="divider" />
                  <TrackingHistory currentData={data} />
                </Accordion>
              )}
              <Box className="placeholder" />
            </DrawerBody>
          </Box>
        )}
      </DrawerContent>
    </Drawer>
  );
}
