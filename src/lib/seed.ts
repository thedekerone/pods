import { PrismaClient, ChartType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Sample widget data
    const widgetData = [
        { name: "Page A", value: "4000" },
        { name: "Page B", value: "3000" },
        { name: "Page C", value: "3500" },
        { name: "Page D", value: "3700" },
    ];

    // Create a new Widget
    const widget = await prisma.widget.create({
        data: {
            name: 'Sample Widget',
            description: 'A sample widget with chart data.',
            chartType: ChartType.BAR, // Replace with actual value from ChartType enum
            // sources: [...] Add connected sources here if required
        }
    });

    // Create WidgetData instances associated with the created widget
    for (const dataItem of widgetData) {
        await prisma.widgetData.create({
            data: {
                name: dataItem.name,
                value: dataItem.value,
                widgetId: widget.id, // Linking to the widget
            },
        });
    }

    console.log(`Created widget with id: ${widget.id}`);
    await prisma.$disconnect();
}

main()
    .catch(e => {
        throw e;
    })
