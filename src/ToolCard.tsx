import { useEffect, useState } from 'react';
import { Anchor, Badge, Card, Group, Image, Text } from '@mantine/core';
import type { Tool } from './tools';

function ScreenshotSection({ screenshots, name }: { screenshots: string[]; name: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (screenshots.length <= 1) return;
    const id = setInterval(() => setIdx(i => (i + 1) % screenshots.length), 4000);
    return () => clearInterval(id);
  }, [screenshots.length]);

  return (
    <Card.Section>
      <Image
        src={screenshots[idx]}
        alt={`${name} screenshot`}
        height={180}
        fit="cover"
        style={{ objectPosition: 'top' }}
      />
    </Card.Section>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  const hasScreenshot = tool.screenshots.length > 0;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ display: 'flex', flexDirection: 'column' }}>
      {hasScreenshot && (
        <ScreenshotSection screenshots={tool.screenshots} name={tool.name} />
      )}

      <Group mt={hasScreenshot ? 'md' : undefined} mb="xs" gap="xs" align="center">
        <img
          src={tool.icon}
          alt=""
          width={16}
          height={16}
          style={{ imageRendering: 'pixelated', flexShrink: 0 }}
        />
        <Anchor
          href={tool.url}
          target="_blank"
          rel="noopener"
          fw={600}
          size="lg"
          c="blue"
        >
          {tool.name}
        </Anchor>
        {tool.screenshots.length > 1 && (
          <Badge size="xs" variant="light" color="gray" ml="auto">
            {tool.screenshots.length} screenshots
          </Badge>
        )}
      </Group>

      <Text size="sm" c="dimmed" lh={1.6} style={{ flex: 1 }}>
        {tool.desc}
      </Text>
    </Card>
  );
}
