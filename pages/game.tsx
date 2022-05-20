import type { NextPage } from 'next'
import { useAppSelector } from '../hooks'

import { Box, Grid, GridItem } from '@chakra-ui/react'

import Layout from '../components/Layout'

const GameMatrix = () => {
  const matrix = useAppSelector((state) => state.app.matrix)
  const matrixLength = matrix.length

  return (
    <Grid
      h="461px"
      templateRows={`repeat(3, 140px)`}
      templateColumns={`repeat(3, 140px)`}
      gap={4}
    >
      {matrix.map((m, idx) => (
        <GridItem
          bg="app.SemiDarkNavy"
          borderRadius="xl"
          key={idx}
          style={{ boxShadow: '#10212A 1px 10px 0px -1px' }}
        />
      ))}
    </Grid>
  )
}

const Game: NextPage = () => {
  return (
    <Layout>
      <Box mt={52}>
        <GameMatrix />
      </Box>
    </Layout>
  )
}

export default Game
