import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import Page from "../components/Page";
import {
  AppShell,
  Box,
  Button,
  Center,
  Image,
  Loader,
  Notification,
  Paper,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getImagesByBreeds, selectImagesByBreed } from "../state/imagesSlice";
import styles from "./ViewPhotos.module.css";
import { IconArrowLeft } from "@tabler/icons-react";

const ViewPhotos = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // Parse breed list from search params
  const breeds = useMemo(
    () => searchParams.get("breeds")?.split(",") || [],
    [searchParams]
  );

  // Select photos for breeds from store
  const imagesByBreed = useAppSelector((state) =>
    selectImagesByBreed(state, breeds)
  );
  const loading = useAppSelector((state) => state.images.loading);
  const error = useAppSelector((state) => state.images.error);

  // Fetch photos for breeds from backend
  useEffect(() => {
    if (breeds.length > 0) dispatch(getImagesByBreeds(breeds));
  }, [breeds, dispatch]);

  // Keep track of latest slide displayed to load images
  const [lastSlideLoaded, setLastSlideLoaded] = useState<number>(0);

  // Update latest slide displayed
  const updateSlidesInView = useCallback((slideNumber: number) => {
    setLastSlideLoaded((lastSlide) => Math.max(lastSlide, slideNumber));
  }, []);

  // Randomize order of images
  const randomizedImages = useMemo(
    () => imagesByBreed.sort(() => Math.random() - 0.5),
    [imagesByBreed]
  );

  return (
    <Page title="View Photos" loading={loading}>
      <AppShell.Main h={"1px"} pos="relative">
        {/* Notification for any error messages */}
        {error && (
          <Notification
            title="Error Loading Images"
            withCloseButton={false}
            color="red"
          >
            {error}
          </Notification>
        )}

        {/* Back button */}
        <Box
          style={{
            position: "absolute",
            top: "calc(var(--app-shell-header-offset, 0rem) + var(--app-shell-padding))",
            left: "var(--app-shell-padding)",
          }}
        >
          <Button
            component={Link}
            to="/"
            leftSection={<IconArrowLeft size={14} />}
          >
            Select Other Breeds
          </Button>
        </Box>

        {/* Image carousel */}
        <Center h="100%">
          <div className={styles.container}>
            <Paper className={styles.embed} withBorder>
              <Carousel
                withIndicators
                h="100%"
                w="100%"
                bg="gray.2"
                onSlideChange={updateSlidesInView}
              >
                {randomizedImages.map((imageUrl, index) => (
                  <Carousel.Slide key={index}>
                    <Center
                      style={{
                        width: "100%",
                        aspectRatio: 1.5,
                        position: "relative",
                      }}
                    >
                      {lastSlideLoaded >= index && (
                        <Image
                          src={imageUrl}
                          style={{ width: "100%", height: "100%", zIndex: 100 }}
                          fit="contain"
                        />
                      )}

                      {/* Display loader behind image if hasn't loaded yet */}
                      <Loader
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                        }}
                      />
                    </Center>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </Paper>
          </div>
        </Center>
      </AppShell.Main>
    </Page>
  );
};

export default ViewPhotos;
