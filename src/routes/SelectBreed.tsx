import React, { useEffect } from "react";
import {
  Affix,
  AppShell,
  Button,
  Flex,
  Notification,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import DogCard from "../components/DogCard";
import { getBreeds, selectBreeds } from "../state/breedSlice";
import { IconArrowRight } from "@tabler/icons-react";

const SelectBreed = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { breeds, loading, error } = useAppSelector(selectBreeds);

  // Keep track of selected breeds
  const [selectedBreeds, setSelectedBreeds] = React.useState<string[]>([]);

  // Fetch breed data from backend
  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  // Select/deselect breed on card button click
  const handleSelect = (breed: string) => {
    setSelectedBreeds((prevSelected) =>
      prevSelected.includes(breed)
        ? prevSelected.filter((b) => b !== breed)
        : [...prevSelected, breed]
    );
  };

  // Navigate to view page with breeds on button click
  const handleContinue = () => {
    const breedsParam = selectedBreeds.join(",");
    navigate(`/view?breeds=${breedsParam}`);
  };

  return (
    <Page title="Select Breeds" loading={loading}>
      <AppShell.Main mb="100px">
        {/* Notification for any error messages */}
        {error && (
          <Notification
            title="Error Loading Breeds"
            withCloseButton={false}
            color="red"
          >
            {error}
          </Notification>
        )}

        {/* Grid of the dog breeds */}
        <SimpleGrid cols={{ base: 1, md: 4, xl: 6 }} flex="grow">
          {breeds.map((breed) => (
            <DogCard
              key={breed.name}
              title={breed.name}
              imageUrl={breed.imageUrl}
              selected={selectedBreeds.includes(breed.name)}
              onSelect={() => handleSelect(breed.name)}
            />
          ))}
        </SimpleGrid>

        {/* "Continue" button overlay */}
        <Affix position={{ bottom: 20, left: 20, right: 20 }}>
          <Paper shadow="lg" bg="gray.3" withBorder>
            <Flex justify="space-between" align="center" p="md">
              <Text>Choose your breeds, then see photos!</Text>
              <Button
                onClick={handleContinue}
                disabled={selectedBreeds.length === 0}
                rightSection={<IconArrowRight size={14} />}
              >
                Continue
              </Button>
            </Flex>
          </Paper>
        </Affix>
      </AppShell.Main>
    </Page>
  );
};

export default SelectBreed;
