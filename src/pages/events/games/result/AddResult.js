import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import ResultService from "../../../../services/CommunicationInterne/ResultService"; // Adjust the import path
import { getAllGames } from "../../../../services/CommunicationInterne/GameService"; // Adjust the import path
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const AddResult = () => {
  const [form] = Form.useForm();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getAllGames();
        setGames(data);
      } catch (error) {
        message.error("Failed to fetch games");
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const resultData = {
        ...values,
        resultDate: values.resultDate
          ? values.resultDate.format("YYYY-MM-DD HH:mm:ss")
          : null,
      };
      await ResultService.createResult(resultData);
      message.success("Result added successfully!");
      navigate("/admin/result-list");
    } catch (error) {
      message.error("Failed to add result");
      console.error("Failed to add result:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    // This can be optimized based on the data and requirements
    const filteredGames = games.filter((game) =>
      game.name.toLowerCase().includes(value.toLowerCase())
    );
    setGames(filteredGames);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#fff", minHeight: "100vh" }}>
      <h2>Add New Result</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Winner"
          name="winner"
          rules={[
            { required: true, message: "Please input the winner's name!" },
          ]}
        >
          <Input placeholder="Enter winner's name" />
        </Form.Item>

        <Form.Item
          label="Runner-Up"
          name="runnerUp"
          rules={[
            { required: true, message: "Please input the runner-up's name!" },
          ]}
        >
          <Input placeholder="Enter runner-up's name" />
        </Form.Item>

        <Form.Item
          label="Third Place"
          name="thirdPlace"
          rules={[
            { required: true, message: "Please input the third place's name!" },
          ]}
        >
          <Input placeholder="Enter third place's name" />
        </Form.Item>

        <Form.Item
          label="Scores"
          name="scores"
          rules={[{ required: true, message: "Please input the scores!" }]}
        >
          <Input placeholder="Enter scores" />
        </Form.Item>

        <Form.Item label="Highlights" name="highlights">
          <TextArea rows={4} placeholder="Enter match highlights" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select placeholder="Select status">
            <Option value="Completed">Completed</Option>
            <Option value="Ongoing">Ongoing</Option>
            <Option value="Scheduled">Scheduled</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Comments" name="comments">
          <TextArea rows={4} placeholder="Enter any comments" />
        </Form.Item>

        <Form.Item
          label="Game"
          name="gameId"
          rules={[{ required: true, message: "Please select a game!" }]}
        >
          <Select
            showSearch
            placeholder="Select a game"
            onSearch={handleSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {games.map((game) => (
              <Option key={game.gameId} value={game.gameId}>
                {game.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Result
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddResult;
