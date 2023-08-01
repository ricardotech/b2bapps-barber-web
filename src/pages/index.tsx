import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Flex, Text } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
  <Flex bg="#111" h="100vh" w="100%" justify="center" align="center">
    <Text color="white" fontFamily="Inter" fontSize="6xl">Hello World</Text>
  </Flex>
    </>
  )
}
