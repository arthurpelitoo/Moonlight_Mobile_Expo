import { Card, CardContent, CardHeader } from "../../../../components/common/Generic/Card";

type StatusCardProps = {
    headerFeatures: React.ReactNode,
    contentFeatures: React.ReactNode
}

export function StatusCard(props : StatusCardProps){
    const {headerFeatures, contentFeatures} = props;

    return(
        <Card>
            <CardHeader>
                <h1 className="text-2xl text-center">{headerFeatures}</h1>
            </CardHeader>
            <CardContent>
                {contentFeatures}
            </CardContent>
        </Card>
    )
}