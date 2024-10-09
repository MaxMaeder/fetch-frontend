import { Button, Card, Image, Title } from "@mantine/core";

interface DogCardProps {
  title: string; // Dog breed/title
  imageUrl: string; // Dog image url
  selected: boolean; // Whether dog selected
  onSelect: (selected: boolean) => void;
}
// Display a selectable dog card
const DogCard = ({ title, imageUrl, selected, onSelect }: DogCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* Image */}
      <Card.Section>
        <Image src={imageUrl} alt={title} style={{ aspectRatio: 1.25 }} />
      </Card.Section>

      {/* Title */}
      <Title order={2} pt="md">
        {title}
      </Title>

      {/* Select button */}
      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        variant={selected ? "outline" : "filled"}
        onClick={() => onSelect(!selected)}
      >
        {selected ? "Unselect" : "Select"}
      </Button>
    </Card>
  );
};

export default DogCard;
