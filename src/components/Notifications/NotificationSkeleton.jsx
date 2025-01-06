import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";

export const NotificationSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={9} w='9' />
      <Skeleton height={2} width={100} />
      <SkeletonCircle h={9} w='9' borderRadius={0}/>
    </Flex>
  );
};