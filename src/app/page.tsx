import { Section, Display, Lead, Button } from "@/components/ui";
export default function Home() {
  return (
    <Section first>
      <Display as="h1" size="xl">One clinic. <em>Every stage of feeling well.</em></Display>
      <Lead>Temporary smoke test page.</Lead>
      <Button to="book">Book an appointment</Button>
    </Section>
  );
}
