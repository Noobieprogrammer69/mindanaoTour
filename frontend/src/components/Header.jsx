import { Flex, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {

  return (
    <Flex
      mb={12}
      height="50px"
      width="100%"
      top={0}
      zIndex={1000}
      justifyContent="center"
      alignItems="center"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
    >
      <Flex
        width="100%"
        maxWidth="1200px"
        justifyContent={{ base: 'space-between', md: 'center' }}
        alignItems="center"
      >
        <Link as={RouterLink} to="/">
          <Text>Logo</Text>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Header