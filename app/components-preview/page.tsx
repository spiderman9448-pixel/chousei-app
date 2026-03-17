"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  RadioGroup,
  Card,
  Badge,
  Table,
  TableCell,
  CopyButton,
} from "@/app/components/ui";

export default function ComponentsPreview() {
  const [radioValue, setRadioValue] = useState("○");
  const [inputValue, setInputValue] = useState("");

  const availabilityOptions = [
    { value: "○", label: "○" },
    { value: "△", label: "△" },
    { value: "×", label: "×" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-foreground">
          コンポーネントライブラリ
        </h1>

        {/* Button */}
        <Card title="Button">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">プライマリ</Button>
              <Button variant="secondary">セカンダリ</Button>
              <Button variant="outline">アウトライン</Button>
              <Button variant="danger">削除</Button>
              <Button disabled>無効</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">小さい</Button>
              <Button size="md">普通</Button>
              <Button size="lg">大きい</Button>
            </div>
          </div>
        </Card>

        {/* Input */}
        <Card title="Input">
          <div className="space-y-4 max-w-md">
            <Input
              label="名前"
              placeholder="山田太郎"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="メールアドレス"
              placeholder="email@example.com"
              type="email"
            />
            <Input
              label="エラー例"
              placeholder="入力してください"
              error="この項目は必須です"
            />
          </div>
        </Card>

        {/* Textarea */}
        <Card title="Textarea">
          <div className="max-w-md">
            <Textarea
              label="メモ"
              placeholder="イベントの詳細を入力..."
            />
          </div>
        </Card>

        {/* RadioGroup */}
        <Card title="RadioGroup（出欠選択）">
          <div className="space-y-3">
            <p className="text-sm text-secondary">
              選択中: <span className="font-bold">{radioValue}</span>
            </p>
            <RadioGroup
              name="preview-availability"
              options={availabilityOptions}
              value={radioValue}
              onChange={setRadioValue}
            />
          </div>
        </Card>

        {/* Badge */}
        <Card title="Badge">
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">○ 5</Badge>
            <Badge variant="warning">△ 2</Badge>
            <Badge variant="danger">× 1</Badge>
            <Badge variant="default">回答 8件</Badge>
          </div>
        </Card>

        {/* Table */}
        <Card title="Table（出欠表）">
          <Table headers={["名前", "3/20 (木)", "3/21 (金)", "3/22 (土)", "コメント"]}>
            <tr className="hover:bg-muted/50">
              <TableCell className="font-medium">山田太郎</TableCell>
              <TableCell align="center" className="text-success text-lg font-bold">○</TableCell>
              <TableCell align="center" className="text-warning text-lg font-bold">△</TableCell>
              <TableCell align="center" className="text-success text-lg font-bold">○</TableCell>
              <TableCell className="text-secondary">どれでも大丈夫です</TableCell>
            </tr>
            <tr className="hover:bg-muted/50">
              <TableCell className="font-medium">鈴木花子</TableCell>
              <TableCell align="center" className="text-success text-lg font-bold">○</TableCell>
              <TableCell align="center" className="text-success text-lg font-bold">○</TableCell>
              <TableCell align="center" className="text-danger text-lg font-bold">×</TableCell>
              <TableCell className="text-secondary">土曜は予定あり</TableCell>
            </tr>
            <tr className="hover:bg-muted/50">
              <TableCell className="font-medium">佐藤一郎</TableCell>
              <TableCell align="center" className="text-danger text-lg font-bold">×</TableCell>
              <TableCell align="center" className="text-success text-lg font-bold">○</TableCell>
              <TableCell align="center" className="text-success text-lg font-bold">○</TableCell>
              <TableCell className="text-secondary"></TableCell>
            </tr>
            {/* 集計行 */}
            <tr className="bg-muted font-bold">
              <TableCell>集計</TableCell>
              <TableCell align="center">
                <div className="flex justify-center gap-1">
                  <Badge variant="success">○2</Badge>
                  <Badge variant="danger">×1</Badge>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center gap-1">
                  <Badge variant="success">○2</Badge>
                  <Badge variant="warning">△1</Badge>
                </div>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center gap-1">
                  <Badge variant="success">○2</Badge>
                  <Badge variant="danger">×1</Badge>
                </div>
              </TableCell>
              <TableCell></TableCell>
            </tr>
          </Table>
        </Card>

        {/* CopyButton */}
        <Card title="CopyButton（URL共有）">
          <CopyButton text="https://chousei.example.com/events/abc123" />
        </Card>

        {/* 組み合わせ例 */}
        <Card title="組み合わせ例：回答フォーム">
          <div className="space-y-5 max-w-md">
            <Input label="あなたの名前" placeholder="名前を入力" />
            <div>
              <p className="text-sm font-medium text-foreground mb-2">3/20 (木) 19:00〜</p>
              <RadioGroup
                name="combo-date1"
                options={availabilityOptions}
                value="○"
                onChange={() => {}}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">3/21 (金) 19:00〜</p>
              <RadioGroup
                name="combo-date2"
                options={availabilityOptions}
                value="△"
                onChange={() => {}}
              />
            </div>
            <Textarea label="コメント" placeholder="任意" />
            <Button size="lg" className="w-full">回答を送信する</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
