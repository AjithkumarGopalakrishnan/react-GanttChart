import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { useState, useRef } from 'react';
import {
    GanttComponent,
    Inject,
    Selection,
    ColumnDirective,
    ColumnsDirective,
    VirtualScroll,
    Edit
} from '@syncfusion/ej2-react-gantt';

const Virtualscroll = () => {

    const [data, setData] = useState([]);
    const startTime = useRef(0);
    const [loading, setLoading] = useState(false);
    const [selectedDataset, setSelectedDataset] = useState('');
    const [enableValidation, setEnableValidation] = useState(false);
    const outputRef = useRef(null);

    const taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        progress: 'Progress',
        parentID: 'parentID',
        dependency: 'Predecessor'
    };

    const generateVirtualData = (recordCount) => {

        const virtualData = [];

        const setsPerParent = 4;
        const tasksPerSet = 5;
        const childPerParent = setsPerParent * tasksPerSet; // 20
        const blockSize = childPerParent + 1;
        const totalParents = Math.floor(recordCount / blockSize);

        let taskId = 1;

        for (let parent = 1; parent <= totalParents; parent++) {

            const parentTaskId = taskId;

            // Parent task
            virtualData.push({
                TaskID: parentTaskId,
                TaskName: `Project ${parent}`,
                StartDate: new Date(2025, 0, 3),
                EndDate: new Date(2025, 1, 28),
                Progress: 50
            });

            taskId++;

            let set1FirstTaskId = null;

            for (let set = 1; set <= 4; set++) {

                // Same dates for all tasks in a set
                const startDate = new Date(2025, 0, 3 + ((set - 1) * 7));
                const endDate = new Date(startDate);
                endDate.setDate(endDate.getDate() + 4);

                for (let child = 1; child <= tasksPerSet; child++) {

                    const currentTaskId = taskId;
                    let predecessor = '';

                    // Store Set1 first task
                    if (set === 1 && child === 1) {
                        set1FirstTaskId = currentTaskId;
                    }

                    // Set1 First Task -> Set4 First Task
                    if (
                        set === 4 &&
                        child === 1 &&
                        set1FirstTaskId
                    ) {
                        predecessor = `${set1FirstTaskId}FS`;
                    }

                    virtualData.push({
                        TaskID: currentTaskId,
                        TaskName: `Project ${parent} - Set ${set} Task ${child}`,
                        StartDate: new Date(startDate),
                        EndDate: new Date(endDate),
                        Progress: 30,
                        parentID: parentTaskId,
                        Predecessor: predecessor
                    });

                    taskId++;
                }
            }
        }
        console.log('Total Records:', virtualData.length);
        return virtualData;
    };

    const loadData = (count) => {

        setLoading(true);
        setSelectedDataset(
            count === 50000 ? '50K' :
                count === 75000 ? '75K' :
                    '100K'
        );

        startTime.current = performance.now();

        const generated = generateVirtualData(count);
        if (outputRef.current) {
            outputRef.current.innerHTML = '';
        }
        setData(generated);
    };

    const onDataBound = () => {

        if (!startTime.current) {
            return;
        }

        const totalTime =
            ((performance.now() - startTime.current) / 1000).toFixed(3);

        if (outputRef.current) {
            outputRef.current.innerHTML = `✅ Loaded ${totalTime} sec`;
        }

        setLoading(false);
        startTime.current = 0;
    };

    let ganttInstance = null;

    return (
        <div className='control-pane'>
            <div className="status-bar">
                <span>
                    Dataset:
                    <select
                        className="record-dropdown"
                        onChange={(e) => loadData(Number(e.target.value))}
                    >
                        <option value="">Select</option>
                        <option value="50000">50K</option>
                        <option value="75000">75K</option>
                        <option value="100000">100K</option>
                    </select>
                </span>
                <span>
                    <label className="validation-toggle">
                        <input
                            type="checkbox"
                            checked={enableValidation}
                            onChange={(e) => setEnableValidation(e.target.checked)}
                        />
                        {' '}Auto Validation
                    </label>
                </span>
                <span>
                    {loading ? '⏳ Loading...' : ''}
                </span>
                <span id="output" ref={outputRef}>0.000 sec</span>
            </div>

            <GanttComponent
                id='VirtualScroll'
                dataSource={data}
                treeColumnIndex={1}
                enableVirtualization={true}
                enableTimelineVirtualization={true}
                taskFields={taskFields}
                height='650px'
                key={enableValidation ? 'val-on' : 'val-off'}
                dataBound={onDataBound}
                autoCalculateDateScheduling={enableValidation}
            >
                <ColumnsDirective>
                    <ColumnDirective field='TaskID' width='100' />
                    <ColumnDirective field='TaskName' width='300' />
                    <ColumnDirective field='StartDate' />
                    <ColumnDirective field='Progress' />
                </ColumnsDirective>

                <Inject services={[Selection, VirtualScroll, Edit]} />
            </GanttComponent>
        </div>
    );
};

export default Virtualscroll;

const root = createRoot(document.getElementById('sample'));
root.render(<Virtualscroll />);