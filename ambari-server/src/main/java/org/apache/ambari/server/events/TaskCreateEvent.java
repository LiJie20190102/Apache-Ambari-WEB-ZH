/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * <p/>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p/>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.ambari.server.events;


import java.util.List;

import org.apache.ambari.server.actionmanager.HostRoleCommand;
import org.apache.ambari.server.events.listeners.tasks.TaskStatusListener;

/**
 * The {@link TaskCreateEvent} is to be fired every time
 * when any request is to be tracked as running requests in
 * {@link TaskStatusListener}
 * This usually happens when new request is created by user action or
 * when ambari-server starts with some stages in non-completed state
 */
public class TaskCreateEvent extends TaskEvent {


  /**
   * Constructor.
   *
   * @param hostRoleCommandList
   *          all hostRoleCommands for all requests
   */
  public TaskCreateEvent(List<HostRoleCommand> hostRoleCommandList) {
    super(hostRoleCommandList);
  }


}
